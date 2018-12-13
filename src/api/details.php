<?php
    include 'connect.php';
    //接收数据
    $id = isset($_GET['id']) ? $_GET['id'] : 1;
    // echo $id;
    
    $sql="SELECT * FROM goodlist WHERE id=$id";
    
    //写查询语句

    $res=$conn->query($sql);//执行语句：得到结果集
    
    $data=$res->fetch_all(MYSQLI_ASSOC);//获取内容部分

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    
    $res->close();//关掉结果集

    $conn->close();//断开连接

?>