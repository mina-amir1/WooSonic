#!/bin/sh

# Start nginx
nginx

# Start php-fpm
php-fpm

# Start tailing the PHP error log
tail -f /var/log/php7/error.log
