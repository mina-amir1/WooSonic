<?php
spl_autoload_register(function ($className) {
    // Convert namespace separators (\) to directory separators (/)
    $classFile = str_replace('\\', '/', $className) . '.php';

    // Specify the base directory where your class files are located
    $baseDir = __DIR__ .'/' ;

    // Check if the class file exists and require it
    if (file_exists($baseDir . $classFile)) {
        require $baseDir . $classFile;
    }
});
?>