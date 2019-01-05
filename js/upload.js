window.onload=function(){

	var filename = document.getElementById("filename");

	var submit = document.getElementById("yes");

    submit.onclick = function(event) {
     	if(filename.value !== ""){
        	if(/^[0-9]*$/.test(filename.value) == false){
             alert("重命名只能是数字！");
             event.preventDefault();
         	}
     	}else{
         alert("重命名不能为空！");
         event.preventDefault();
     	}
 	}
}
