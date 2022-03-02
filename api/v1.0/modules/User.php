<?php

class User {
    private $base;

    function __construct($conn)
    {
        $this->base = $conn;
    }

    public function Cart($data, $params=null) {

        $this->IsEmpty($data);
        
        $productArr = json_decode($data['arr'], true);
        $totalPrice = $this->GetTotalPrice($productArr);
        $orderID = $this->generate_string(6);
        $this->AddProductList($orderID , $productArr);
        
        $date = date('Y.m.d');

        $stmt = $this->base->prepare("INSERT INTO `orders`(`address`, `order_id`, `phone`, `total_price`, `email`, `tg_id`, `isPay`, `Date`, `size`, `post_index`) VALUES (?,?,?,?,?,?,?,?,?,? )");
        $stmt->execute([ $data['address'], $orderID, $data['phone'], $totalPrice, $data['email'], $data['tg_id'], 0 , $date, $data['size'],$data['post_index'] ]);

        echo json_encode([
            "server_info" => [
                "version" => "1.0",
                "date" => date('l jS \of F Y h:i:s A')
            ],
            "order_id" => $orderID,
            "totalPrice" => $totalPrice
        ] , JSON_UNESCAPED_UNICODE);
    }

    private function IsEmpty($data) {
        if( !empty($data['address'] && !empty($data['phone']) && !empty($data['email']) && !empty($data['tg_id']) && !empty($data['size']) && !empty($data['post_index']))) {
           return true;
        }
            ErrorMaker::ErrorHeandler("not params", 200, [
                "version" => "1.0",
                "date" => date('l jS \of F Y h:i:s A')
            ]);
    }


    private function generate_string($strength = 16) {
        $input = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        $input_length = strlen($input);
        $random_string = '';
        for($i = 0; $i < $strength; $i++) {
            $random_character = $input[mt_rand(0, $input_length - 1)];
            $random_string .= $random_character;
        }

        return $random_string;
    }

    private function AddProductList($orderID, $productArr) {
        for($i = 0; $i < count($productArr); $i++) {
            $stmt = $this->base->prepare("INSERT INTO `orderlist`(`order_id`, `product_id` , `count`) VALUES (?,?,?)");
            $stmt->execute( [$orderID , $productArr[$i][0],   $productArr[$i][1]]);
        }

    }

    private function GetTotalPrice($productArr) {
        $totalPrice = 0;
        for($i = 0; $i < count($productArr); $i++) {
            $priceProduct = (int)$this->GetItem($productArr[$i][0]);
            $priceProduct *= $productArr[$i][1];
            $totalPrice += $priceProduct;
        }
        return $totalPrice;
    }

    private function GetItem($id) {
        $stmt = $this->base->prepare("SELECT `price` FROM `products` WHERE `id` = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetchColumn();
        return (int)preg_replace('/[^0-9]/', '', $row);
    }
}

$user = new User($conn);