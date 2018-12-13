<?php
    include 'connect.php';

    $sql="SELECT * FROM goodlist";//写查询语句

    $res=$conn->query($sql);//执行语句：得到结果集
    
    $data=$res->fetch_all(MYSQLI_ASSOC);//获取内容部分
// echo $data;
   

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    
    $res->close();//关掉结果集

    $conn->close();//断开连接

?>