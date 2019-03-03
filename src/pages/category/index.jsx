import React, {Component} from 'react';
import {
  Card,
  Button,
  Icon,
  Table,
  message,
  Modal
} from 'antd';

import {reqCategories,reqAddCategory,reqUpdateCategoryName} from '../../api';

import AddCategoryForm from '../../componnets/add-category-form';
import UpdateCategoryNameForm from '../../componnets/update-category-name-form';
import MyButton from '../../componnets/my-button';

export default class Category extends Component {
  state = {
    categories:[],//保存所有一级数据
    subCategories:[],//保存所有二级数据
    isAddShow: false,
    isupdateShow:false,
    parentId: '0',//保存父分类
    parentName: '',
    isSubCategoriesLoading: true,
    category:{}
  }

  //点击成功添加分类的方法
  addCategory = async ()=>{
    //获取当前表单数据
    const {parentId,categoryName} =  this.form.getFieldsValue()
    //发送请求，后台添加分类
    const result = await reqAddCategory(parentId,categoryName);
    //初始化更新状态的对象
    const updateState = {isAddShow:false}
    if(result.status === 0){
      //请求成功
      message.success('后台添加分类成功');
      const currentId = this.state.parentId;
      if(parentId === '0'){
        //更新数据 -- 把原来的数据和添加的放到一块
        /*this.setState({
          categories:[...this.state.categories,result.data],
          isAddShow:false
        })*/
        //优化上面的
        updateState.categories = [...this.state.categories,result.data]
      }else {
        if(currentId === parentId){
          /*this.setState({
            subcategories:[...this.state.subCategories,result.data],
            isAddShow:false
          })*/
          updateState.subCategories = [...this.state.subCategories,result.data]
        }
      }
    }else {
      //请求失败
      message.error('后台添加数据失败')
    }

    //清空用户的输入 -- 不传参数就是全部清除
    this.form.resetFields();

    //统一更新状态 -- 上面走完都会要更新状态，来到这里执行一次
    this.setState(updateState)

  }

  //获取列表数据的方法
  getCategories = async parentId=>{
    //发送请求
    const result = await reqCategories(parentId);
    //判断是一级分类还是二级 --为以后功能回退 ，怕会覆盖
    if(result.status === 0){
      //获取列表成功
      if(parentId === '0'){
        //获取列表成功
        this.setState({
          categories:result.data
        })
      }else {
        //获取列表成功 --loading在二级中，要是二级中aaa没有数据，也不能有loading显示
        if(result.data.length){
          //二级有值的话，正常更新
          this.setState({
            subCategories:result.data,
            isSubCategoriesLoading:true
          })
        }else {
          //没有值，是空数组  --通知显示 初始化 --必须更新（以前有数据）
          this.setState({
            subCategories:result.data,
            isSubCategoriesLoading:false
          })

        }

      }
    }else {
      //获取列表失败
      message.error('获取列表数据失败')
    }

  }

  //修改分类名称的方法
  updateCategoryName = async ()=>{
    //获取修改后的名称
    const categoryName = this.form.getFieldValue('categoryName');
    //获取修改前的名称
    const {name,_id} = this.state.category;
    //判断修改前后是否一致，一致就不用修改
    if(categoryName === name){
      message.warn('请修改分类名称')
    }else {
      //修改名称
      //请求后台数据 - 发送请求 --(要修改的，修改后的)
      const result = await reqUpdateCategoryName(_id,categoryName)
      if(result.status === 0){
        message.success('修改分类成功');
        //关闭对话框
        this.setState({
          isupdateShow: false,
          //更新页面显示 --把数组里的值改成修改后的值
          categories: this.state.categories.map(item => {
            if(item._id === _id){
              item.name = categoryName
            }
            //不管成功和失败都要返回item -- 数组前面的值会没有变成undefinde ,只修改其中一个
            return item

          })
        })

      }else {
        message.error('修改分类失败');
        //关闭对话框
        this.setState({
          isupdateShow: false
        })
      }
    }
  }

  //不要在每次渲染一次就定义一次 --只渲染一次
  componentWillMount(){
    this.columns = [{
      title: '品类名称',
      dataIndex: 'name',
      // render: text =>text,
    }, {
      title: '操作',
      width:400,
      render: category=>{
        const {parentId} = this.state;
        if(parentId === '0'){
          return <div>
            <MyButton name='修改名称' onClick={() => this.setState({isupdateShow: true, category})}/> &nbsp;&nbsp;&nbsp;
            <MyButton name='查看其子品类' onClick={()=> {
              //让表单列表显示二级分类数据
              this.setState({
                parentId:category._id,
                parentName: category.name
              })
              //请求二级分类数据
              this.getCategories(category._id);
            }}/>
          </div>
        }else {
          return <MyButton name='修改名称' onClick={() => this.setState({isupdateShow: true, category})}/>

        }
      }
    }];
  }

  //发送ajax请求
  componentDidMount(){
    this.getCategories('0');
  }

  render () {

    const {categories,subCategories,isAddShow,isupdateShow,category,parentId,parentName,isSubCategoriesLoading} = this.state;
    const isCategory = parentId === '0';
    //判断列表显示一级还是二级 ，初始值定义一个partentId :'0' -- 显示子分类列表
    const data = isCategory? categories:subCategories
    //判断loading ：是一级还是二级显示
    const isLoading = isCategory ? categories.length ===0:isSubCategoriesLoading&&subCategories.length ===0;

    return (
      <Card
        title={
          isCategory
            ? '一级分类列表'
            : <div><MyButton onClick={() => {
            this.setState({parentId: '0'})
          }} name='一级分类'/><Icon type="arrow-right" />&nbsp;&nbsp;{parentName}</div>
        }
        extra={<Button type='primary' onClick={()=>this.setState({isAddShow:true})}><Icon type="plus" />添加品类</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={data}
          bordered
          pagination ={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true
          }}
          rowKey ='_id'
          loading ={isLoading}
        />


        <Modal
          title="更新分类"
          okText='确认'
          cancelText='取消'
          visible={isupdateShow}
          onOk={this.updateCategoryName}
          onCancel={()=> this.setState({isupdateShow:false})}
          width={300}
        >
          <UpdateCategoryNameForm categoryName={category.name} setForm={form=>this.form=form}/>
        </Modal>

        <Modal
          title="添加分类"
          okText='确认'
          cancelText='取消'
          visible={isAddShow}
          onOk={this.addCategory}
          onCancel={()=> this.setState({isAddShow:false})}
        >
          <AddCategoryForm categories={categories} setForm={form=>this.form=form}/>
        </Modal>
      </Card>
    )
  }
}