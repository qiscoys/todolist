window.addEventListener('load',function () {
    let title = document.querySelectorAll('.tab>li');
    let contents = document.querySelector('.content');
    let prev =0;
    let type='all';
    let flag={all:'all',done:'true',doing:'false'}
    let todolist =[
        {
            id:1, content:'妲己不好玩',ctime:'2019.06.08',status:false
        },
        {
            id:2, content:'虞姬不好玩',ctime:'2019.06.09',status:false
        },
        {
            id:3, content:'程咬金不好玩',ctime:'2019.06.07',status:true
        },
        {
            id:4, content:'张良不好玩',ctime:'2019.06.06',status:true
        }

    ];

    title.forEach((ele,index) => {
        ele.onclick = function () {
            title[prev].classList.remove('hot');
            this.classList.add('hot');
            prev = index;
            type= this.getAttribute('type');
            // console.log(type);
            render(filterData(type));
        }
    });
    title[0].onclick();
    ///////////////////修改状态///////////////////////////////////
    /*
        视图->数据
        li ->数组元素
        复选框 ->数组元素status (li->id)

     */
    /////////////////渲染/////////////////////////////

    // let checkbox = document.querySelectorAll('input[type = checkbox]')
    //
    // checkbox.forEach(ele=>{
    //     ele.onclick =function () {
    //         let id = this.parentNode.id;
    //         let arr = todolist.filter(eles=>eles.id==id)[0];
    //         arr.status = true;
    //     }
    // })

    contents.onclick=function (e) {
        let arr = [];
        let target=e.target;
        let id=target.parentNode.id;
        if (target.nodeName=='INPUT'){
            let ele=todolist.filter(ele=>ele.id==id)[0];
            // console.log(ele);
            ele.status=target.checked;
        }else if (target.nodeName == 'DEL'){
            let index=todolist.findIndex(ele=>ele.id==id)
           todolist.splice(index,1)
        }
        render( filterData(type))
    };

    //添加
let forms=document.forms[0];
let textBtn=forms.elements[0];
let submitBtn=forms.elements[1];

submitBtn.onclick=function (e) {
    e.preventDefault();
    let obj=creatObj();
    todolist.push(obj);
    forms.reset();
    render( filterData(type))
};
function creatObj() {
    let id=todolist[todolist.length-1].id+1;
    let content=textBtn.value;
    let ctime=new Date().toLocaleDateString();
    let status=false;
    return{id,content,ctime,status}
}

    function filterData(type){
        let arr=[];
        switch(type){
            case 'all':
                arr = todolist;
                break;
            case 'done':
                arr = todolist.filter(function (ele) {return ele.status});
                break;
            case 'doing':
                arr = todolist.filter(function (ele) {return !ele.status});
                break;
        }
        return arr;
    }
    function render(arr) {
        let html = '';
        arr.forEach(function (elem) {
            if(elem.status){
                html +=`
                    <li id = ${elem.id}>
                        <input type="checkbox" checked> 
                        <p>${elem.content}</p> 
                        <del>×</del>
                        <time>${elem.ctime}</time>
                        
                    </li>
                `;
            }else{
                html +=`
                    <li id = ${elem.id}>
                        <input type="checkbox" > 
                        <p>${elem.content}</p> 
                        <del>×</del>
                        <time>${elem.ctime}</time>
                       
                    </li>
                `;
            }
        })
        contents.innerHTML = html;
    }
})
