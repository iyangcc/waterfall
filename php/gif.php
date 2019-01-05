﻿<?php

 header("Content-type: text/html; charset= utf-8");

if(is_uploaded_file($_FILES['file']['tmp_name'])){
    
    // 获取新命名
    // $rename = $_POST['rename'];

	$img=$_FILES['file']['tmp_name']; 
	$thumbs_name=str_replace(".gif",".jpg",$_FILES['file']['name']);

    $upfile=$_FILES["file"]; 

	//获取数组里面的值  
    $name=$upfile["name"];//上传文件的文件名  
    $type=$upfile["type"];//上传文件的类型  
    $size=$upfile["size"];//上传文件的大小  
    $tmp_name=$upfile["tmp_name"];//上传文件的临时存放路径  

	//判断是否为图片  
    switch ($type){  
        case 'image/pjpeg':$okType=true;  
            break;  
        case 'image/jpeg':$okType=true;  
            break;  
        case 'image/gif':$okType=true;  
            break;  
        case 'image/png':$okType=true;  
            break;  
    }  
  
    if($okType){  
        /** 
         * 0:文件上传成功<br/> 
         * 1：超过了文件大小，在php.ini文件中设置<br/> 
         * 2：超过了文件的大小MAX_FILE_SIZE选项指定的值<br/> 
         * 3：文件只有部分被上传<br/> 
         * 4：没有文件被上传<br/> 
         * 5：上传文件大小为0 
         */  
        $error=$upfile["error"];//上传后系统返回的值  
        echo "================<br/>";  
        echo "上传文件名称是：".$name."<br/>";  
        echo "上传文件类型是：".$type."<br/>";  
        echo "上传文件大小是：".$size."<br/>";  
        // echo "上传后系统返回的值是：".$error."<br/>";  
        // echo "上传文件的临时存放路径是：".$tmp_name."<br/>";  
  
        echo "开始移动上传文件<br/>";  
		//把上传的临时文件移动到upload目录下面(upload是在 已经创建好的！！！)
		
        $bool = false;

        if($type == 'image/gif'){

        	$thumbs_name=str_replace(".gif",".jpg",$_FILES['file']['name']);
			 
			$size=getimagesize($img);
			 
			$image=imagecreatetruecolor($size[0],$size[1]);
			 
			$upimg=imagecreatefromgif($img);
			 
			imagecopy($image,$upimg,0,0,0,0,$size[0],$size[1]);
			 
			imagejpeg($image,"http://www.iyang.club/Test/images/upload/".$thumbs_name);

			move_uploaded_file($img,"http://www.iyang.club/Test/images/upload/".$_FILES['file']['name']);
		 
			imagedestroy($image); 
	 
	        $destination="../images/upload/".$name;

	        $destinationend="../images/upload/".$thumbs_name;

	        $bool = true;

        }else{

        	move_uploaded_file($tmp_name,"http://www.iyang.club/Test/images/upload/".$_FILES['file']['name']);

		 	$destination="../images/upload/".$name;
        }
		 
        echo "================<br/>";  
        echo "上传信息：<br/>";  
        if($error==0){  
            echo "文件上传成功啦！";  
            echo "<br>图片预览:<br>";  
            echo "<img src=".$destination.">&nbsp;"; 
            if($bool) {
            	echo "<img src=".$destinationend.">"; 
            }
             
			echo "<br>上传时间:".$showtime=date("Y-m-d H:i:s");  
        }elseif ($error==1){  
            echo "超过了文件大小，在php.ini文件中设置";  
        }elseif ($error==2){  
            echo "超过了文件的大小MAX_FILE_SIZE选项指定的值";  
        }elseif ($error==3){  
            echo "文件只有部分被上传";  
        }elseif ($error==4){  
            echo "没有文件被上传";  
        }else{  
            echo "上传文件大小为0";  
        }  
    }else{  
        echo "请上传jpg,gif,png等格式的图片！";  
    }  
} 
 
?>