<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true);
if (isset($request_data['action'])) {
    $action = $request_data['action'];
    if (strtolower($action) === 'add') {
        if (isset($request_data['product_id'], $request_data['reviewer_name'], $request_data['reviewer_email'], $request_data['review_content'], $request_data['rating'])) {
            $data = array(
                'comment_post_ID' => $request_data['product_id'],
                'comment_author' => $request_data['reviewer_name'],
                'comment_author_email' => $request_data['reviewer_email'],
                'comment_content' => $request_data['review_content'],
                'comment_approved' => 1,
                'comment_type' => 'review',
                'comment_meta' => array(
                    'rating' => $request_data['rating']
                )
            );
            $comment_id = wp_insert_comment($data);
            // Add the rating to the comment metadata
            add_comment_meta($comment_id, 'rating', $request_data['rating']);
            if ($comment_id) {
                echo json_encode(1);
            } else {
                echo json_encode(['Err in adding review']);
            }
        } else {
            echo json_encode(['Err in Payload']);
        }
    } elseif (strtolower($action) === 'edit') {
        if (isset($request_data['review_id'], $request_data['review_content'], $request_data['rating'])) {
            $comment = get_comment($request_data['review_id'], "ARRAY_A");
            if ($comment) {
                $comment['comment_content'] = $request_data['review_content'];
                update_comment_meta($request_data['review_id'], 'rating', $request_data['rating']);
                echo wp_update_comment($comment) ? json_encode(1) : json_encode(['Err in editing review']);
            } else {
                echo json_encode(['Review not found']);
            }
        } else {
            echo json_encode(['Err in Payload']);
        }
    } elseif (strtolower($action) === 'get_product') {
        if (isset($request_data['product_id'])) {
            $args = array(
                'post_id' => $request_data['product_id'],
                'status' => 'approve',
                'type' => 'review',
            );
            if (isset($request_data['number'])) {
                $args['number'] = $request_data['number'];
            }
            $reviews = get_comments($args);
            if (is_array($reviews)) {
                $reviews_data = [];
                foreach ($reviews as $review) {
                    $rating = get_comment_meta($review->comment_ID, 'rating', true);
                    $reviews_data [] = [
                        'review_id' => $review->comment_ID,
                        'product_id' => $review->comment_post_ID,
                        'author' => $review->comment_author,
                        'email' => $review->comment_author_email,
                        'date' => $review->comment_date,
                        'content' => $review->comment_content,
                        'author_id' => $review->user_id,
                        'rating' => $rating,
                    ];
                }
            }
            echo json_encode($reviews_data);
        } else {
            echo json_encode(['Err in Payload']);
        }
    }elseif (strtolower($action) === 'delete'){
        if (isset($request_data['review_id'])){
           echo wp_delete_comment($request_data['review_id'], true)? json_encode(1):json_encode(['Err in deleting review']);
        }else {
            echo json_encode(['Err in Payload']);
        }
    }
} else {
    $args = array(
        'status' => 'approve',
        'type' => 'review',
    );
    if (isset($request_data['number'])) {
        $args['number'] = $request_data['number'];
    }
    $reviews = get_comments($args);
    if (is_array($reviews)) {
        $reviews_data = [];
        foreach ($reviews as $review) {
            $rating = get_comment_meta($review->comment_ID, 'rating', true);
            $reviews_data [] = [
                'review_id' => $review->comment_ID,
                'product_id' => $review->comment_post_ID,
                'author' => $review->comment_author,
                'email' => $review->comment_author_email,
                'date' => $review->comment_date,
                'content' => $review->comment_content,
                'author_id' => $review->user_id,
                'rating' => $rating,
            ];
        }
    }
    echo json_encode($reviews_data);
}