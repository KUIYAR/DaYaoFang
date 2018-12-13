<?php
    include 'connect.php';
    //接收数据
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 4;
    // echo $page;
    $index=($page-1)*$qty;//计算下标的公式

    $sql="SELECT * FROM goodlist LIMIT $index,$qty";//写查询语句

    $res=$conn->query($sql);//执行语句：得到结果集
    
    $data=$res->fetch_all(MYSQLI_ASSOC);//获取内容部分
// echo $data;
    $sql2='select * from goodlist';//再写一个查询语句

    $res2=$conn->query($sql2);

    $row=$res2->num_rows;//获取数据库中的总条数

    $pages = ceil($row/$qty);

    $goodlist=array(
        'datalist'=>$data,//查询到的数据(按页数查询的)
        'total'=>$row,//总条数
        'qty'=>$qty,//每页显示多少条
        'pages'=>$pages,//总页数
        'page'=>$page//当前页
        
    );

    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
    
    $res->close();//关掉结果集
    $res2->close();//关掉结果集
    $conn->close();//断开连接

?>