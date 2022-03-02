<?php

class Product {
    private $base;

    function __construct($conn)
    {
        $this->base = $conn;
    }

    public function Items($data=null , $index=null , $params) {

        $index = $this->IsEmptyIndex($index);
        $type = $this->IsEmptyParams($params);

        $lastIndex = $index;
        $nextIndex = $lastIndex + 10;

        $sort = $this->GetSortType($params);
        $arr = [
            "server_info" => [
                "version" => "1.0",
                "date" => date('l jS \of F Y h:i:s A')
            ],
            "items" => [

            ],
            "lastIndex" => $nextIndex,
        ];

        $res = $this->GetItems( $type, $lastIndex , $nextIndex, $sort );
        $this->MakeArr($res, $arr);
        
    }

    public function Product($data=null , $index=null , $params) { 
        $stmt = $this->base->prepare("SELECT * FROM `products` WHERE `id` = ?");
        $stmt->execute([ $index ]);
        $res = $stmt->fetch();
        echo json_encode( $res, JSON_UNESCAPED_UNICODE );
    }

    public function DeropSearch($data=null , $q=null , $params) {

        if(empty($q)) {
            ErrorMaker::ErrorHeandler("not params for search", 200, [
                "version" => "1.0",
                "date" => date('l jS \of F Y h:i:s A')
            ]);
        }

        $arr = [
            "server_info" => [
                "version" => "1.0",
                "date" => date('l jS \of F Y h:i:s A')
            ],
            "items" => [

            ],
        ];

        $stmt = $this->base->prepare("SELECT * FROM `products` WHERE `title` LIKE CONCAT('%', ? , '%') LIMIT 10");
        $stmt->execute([ $q ]);

        $this->MakeArr($stmt, $arr);
    }

    public function Search($data=null , $index=null , $params) {

        $q = $params[2];

        if(empty($q)) {
            ErrorMaker::ErrorHeandler("not params for search", 200, [
                "version" => "1.0",
                "date" => date('l jS \of F Y h:i:s A')
            ]);
        }

        $index = $this->IsEmptyIndex($index);
        
        $lastIndex = $index;
        $nextIndex = $lastIndex + 10;

        
        $arr = [
            "server_info" => [
                "version" => "1.0",
                "date" => date('l jS \of F Y h:i:s A')
            ],
            "items" => [

            ],
            "lastIndex" => $nextIndex,
        ];

        
        $stmt = $this->base->prepare("SELECT * FROM `products` WHERE `title` LIKE CONCAT('%', ? , '%') LIMIT ?,?");
        $stmt->execute([ $q , $lastIndex , $nextIndex ]);

        $this->MakeArr($stmt, $arr);
    }

    private function MakeArr($res , $arr) {
        while($row = $res->fetch()) {
            array_push($arr['items'] , [
                "id" => $row['id'],
                "title" => $row['title'],
                "price" => $row['price'],
                "description" => $row['description'],
                "type" => $row['typeSize'],
                "typeSize" => $row['typeSize'],
                "img" => $row['img']
            ]);
        }

        echo json_encode($arr , JSON_UNESCAPED_UNICODE);
    }

    private function GetItems( $type, $lastIndex , $nextIndex , $sort) {
        $q = "SELECT * FROM `products` WHERE `type` = ? ORDER BY " . $sort . " LIMIT ?,?";

        $stmt = $this->base->prepare($q);
        $stmt->execute([ $type, $lastIndex , $nextIndex ]);
        return $stmt;
    }
    
    private function GetSortType($params) {
        $sort = $params[3];

        switch ($sort) {
            case 'ASC':
                return 'id ASC';
                break;
            case 'price_asc':
                return 'price ASC';
                break;
            case 'price_desc':
                return 'price DESC';
                break;
            default:
                return 'id DESC';
                break;
        }
    }

    private function IsEmptyIndex($index) {
        if(empty($index)) {
            $index = 0;
        
        }

        return $index ;
    }

    private function IsEmptyParams($params) {
        $type = $params[2];

        if(empty($params[2]) || !isset($params[2])) {
            $type = 0;
        }

        return $type ;
    }
}

$product = new Product($conn);