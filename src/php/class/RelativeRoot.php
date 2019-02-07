<?php
class RelativeRoot {

    public static function getURL(): string {

        $file = 'index.php';
        $url = '';
        $esc = '../';

        for ($i=0; $i<5; $i++) {

            if (is_file($file))
                return $url;
            else {
                $url = $esc . $url;
                $file = $esc . $file;
            }

        }

    }

}