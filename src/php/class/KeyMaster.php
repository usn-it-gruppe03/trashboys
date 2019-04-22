<?php declare(strict_types=1);


/**
 * Class KeyMaster
 *
 * @author Isak K. Hauge
 */
class KeyMaster {


    /**
     * Encrypt.
     *
     * This function will encrypt whatever you put in.
     *
     * @param $data
     * @return string
     */
    public static function enc(string $data): string {


        // Get cipher and key:
        $cipher = self::get_cipher();
        $key = self::get_key();


        // Calculate initialization vector length:
        $ivlen = openssl_cipher_iv_length($cipher);

        // Create random initialization vector with predefined length:
        $iv = openssl_random_pseudo_bytes($ivlen);

        // Encrypt data:
        $data_raw = openssl_encrypt($data, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);

        // Create hashed message authentication code (HMAC):
        $hmac = hash_hmac('sha256',$data_raw,$key,$as_binary=true);

        // Create classified output:
        $classified = base64_encode($iv.$hmac.$data_raw);


        // Return classified data:
        return $classified;

    }




    /**
     * Decrypt.
     *
     * This function will decrypt whatever you put in.
     *
     * @param $data
     * @return string
     */
    public static function dec(string $data): string {


        // Get cipher and key:
        $cipher = self::get_cipher();
        $key = self::get_key();


        // Decode Base64:
        $decoded_b64 = base64_decode($data);

        // Calculate initialization vector length:
        $ivlen = openssl_cipher_iv_length($cipher);

        // Get previously used initialization vector:
        $iv = substr($decoded_b64, 0, $ivlen);

        // Get previously used hashed message authentication code:
        $hmac = substr($decoded_b64, $ivlen, $sha2len=32);

        // Get raw encoded data:
        $data_raw = substr($decoded_b64, $ivlen+$sha2len);

        // Decrypt encoded data:
        $declassified = openssl_decrypt($data_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);


        // Safe output: Timing attack safe comparison:
        $calc_hmac = hash_hmac('sha256', $data_raw, $key, $as_binary=true);
        if ( hash_equals($hmac, $calc_hmac) ){

            // Return declassified data:
            return $declassified;

        } else {

            return '';

        }


    }




    /**
     * Get cipher.
     *
     * @return string
     */
    private static function get_cipher(): string {

        // Retrieve cipher from file:
        $cipher = file_get_contents(RelativeRoot::getURL().'.security/.cipher');

        // Return the cipher:
        return $cipher;

    }




    /**
     * Get key.
     *
     * @return string
     */
    private static function get_key(): string {

        // Retrieve key from file:
        $key = file_get_contents(RelativeRoot::getURL().'.security/.key');

        // Return the key:
        return $key;

    }

}