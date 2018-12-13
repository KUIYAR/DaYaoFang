<?php

    //把用户名密码插入数据库的表格中
    include 'connect.php';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    $sql = "INSERT INTO user_inf(name,password) VALUES('$username','$password')";

    $res = $conn->query($sql);


    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }


    $conn->close();

?>