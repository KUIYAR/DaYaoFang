<?php
    include 'connect.php';
    //接收数据
    $id = isset($_GET['id']) ? $_GET['id'] : 1;
    $number = isset($_GET['number']) ? $_GET['number'] : 1;
    // echo $id.','.$number;

    $sql = "select * from cart where id = $id";
    $res = $conn->query($sql);
    // var_dump($res);
    if($res->num_rows){
        // 表示该商品已经在购物车中只需修改数量
        // 获取原有的数量.修改原有数量
       
        $row = $res->fetch_all(MYSQLI_ASSOC);
        $n = $number;
        // 修改数据
        $sql2 = "update cart set number = $n where id = $id";
        $ok = $conn->query($sql2);
        if($ok) {
            echo $ok; // 加入购物车成功
        }
    }else{ 
        // 表示查询的数据为空,即购物车没有该商品那么进行插入数据
        $sql3 = "insert into cart (id,name,price,url,url2,detailurl,detailurl2,hot,new) 
        select id, name, price, url, url2, detailurl, detailurl2, hot,new from goodlist where id=$id";
        $res3 = $conn->query($sql3);
        if($res3) {
            // 执行数量的更新
            $sql4 = "update cart set number = $number where id = $id";
            $ok1 = $conn->query($sql4);
            if($ok1) {
                echo $ok1; // 加入购物车成功
            }
        }
    }

    // //关闭数据库
    $conn->close();
?>