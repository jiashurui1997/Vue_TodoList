
 let testData = [
    { id:1,content: "is a", status: 0, updateTime: new Date().toLocaleDateString() },
    { id:2,content: "is b", status: 1, updateTime: new Date().toLocaleDateString() },
    { id:3,content: "is c", status: 1, updateTime: new Date().toLocaleDateString() },
    { id:4,content: "is c", status: 1, updateTime: new Date().toLocaleDateString() },
    { id:5,content: "is c", status: 1, updateTime: new Date().toLocaleDateString() }
  ]
  let folderTrees = [
    {
    id:1,
    title:"文件夹1",
    content:[
      {id:1,parentId:1,listName:"我的清单",detail:testData},
      {id:2,parentId:1,listName:"我的清单2",detail:testData}
    ],
    showChild:false
    },
    {
    id:2,
    title:"文件夹2",
    content:[
      {id:1,parentId:2,listName:"我的清单3",detail:testData},
      {id:2,parentId:2,listName:"我的清单4",detail:testData}
    ],
    showChild:false
    },
]
  let currentFolderId = 0
  let currentListId =-1

  let vm = new Vue({
    el: "#app",
    data: {
      folderTrees:folderTrees,
      currentFolderId: currentFolderId,
      currentListId : currentListId,
      inputText: ""
    },
    methods: {
      toggleFolder: function (folderObj){
        this.currentFolderId =folderObj.id
        folderObj.showChild = !folderObj.showChild
      },
      toggleList: function (listObj){
        this.currentFolderId =listObj.parentId
        this.currentListId =listObj.id
      },
      complete: function (todoObj) {
        var currentFolderId  = this.currentFolderId;
        var currentListId = this.currentListId;

        this.folderTrees.filter(function(item){
          return currentFolderId == item.id
        })[0].content.filter(function(item){
          return currentListId == item.id
        })[0].detail.filter(function(item){
          return todoObj.id == item.id
        })[0].status = 1;

      },
      uncomplete: function (todoObj) {
        var currentFolderId  = this.currentFolderId;
        var currentListId = this.currentListId;

        this.folderTrees.filter(function(item){
          return currentFolderId == item.id
        })[0].content.filter(function(item){
          return currentListId == item.id
        })[0].detail.filter(function(item){
          return todoObj.id == item.id
        })[0].status = 0;
      },
      addTodoItem: function(){
        if(this.inputText == "") {return}
        this.currentList.detail.unshift({
          id:this.currentList.detail[this.currentList.detail.length-1].id +1,
          content:this.inputText,
          status:0,
          updateTime:new Date().toLocaleDateString()
        })
        this.inputText = ""
      },
      addFolder:function(){
        this.folderTrees.push(
          {id:this.folderTrees.length+1,
            title:"newCustom",
            content:[],
            showChild:false});
      },
      addList:function(folderObj){
        var thatcurrentFolderId = this.currentFolderId

        var listObjs = this.folderTrees.filter(function(item){
          return folderObj.id == item.id
        })[0]
        listObjs.content.push(
          {id:listObjs.content.length+1,parentId:thatcurrentFolderId,listName:"用户输入",detail:[]}
          )
      }
    },
    computed: {
      currentList: function (){
        var thatcurrentFolderId = this.currentFolderId
        var thatcurrentListId = this.currentListId
        
        //ID chongfu ??
        var list = this.folderTrees.filter(function (obj) {
          return obj.id == thatcurrentFolderId
        })[0]

        if (list === undefined ){
          console.log("error")
          return null
        }
        else {
          //list id chongfu
          return  list.content.filter(function (listObj) {
            return listObj.id === thatcurrentListId
        })[0]
        }
      },
      unFinishedList: function () {
        return this.currentList.detail.filter(function (item) {
          return item.status === 0
        })
      },
      FinishedList: function () {

        return this.currentList.detail.filter(function (item) {
          return item.status === 1
        })
      }
      }
  });


 document.oncontextmenu= function(e){ 
  var e = e || window.event;
  if(e.button == "2"){ 
   return true;
 }
  return true;
}