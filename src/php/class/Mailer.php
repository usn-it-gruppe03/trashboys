<?php
/**
 * @author Ove Simon Wernersson
 * @version 1.o
 */
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require '../mailer/src/PHPMailer.php';
require '../mailer/src/Exception.php';
require '../mailer/src/SMTP.php';
require_once '../function/global/functions.php';


class Mailer
{
    private $mail;
    private $email_key;
    private $email;

    const MAIL_REGISTRATION = 0;
    const MAIL_ORDER = 1;
    const MAIL_NOTIFICATION = 2;


    /**
     *
     * The constructor will declare the PHPMailer object and call the initMail()
     * and load_email_key() functions
     *
     * */
    public function __construct()
    {
        $this->mail = new PHPMailer();
        $this->load_email_key();
        $this->initMail();

    }

    /**
     * Sends a mail with the with the required in parameters.
     *
     * @param $template - Sends the HTML template as a string that should be used in the mail.
     * @param $type - Determines if the email being sent is a for registration, order or notification
     * @param $to_email - The recipient of the email
     */

    public function sendMail($template, int $type, string $to_email): void{

            try {


                // Set recipient of the email, and reply address
                $this->mail->addAddress($to_email);

                // Using html as content in email
                $this->mail->isHTML(true);

                switch ($type) {
                    // What should the subject and from title in email say
                    case self::MAIL_REGISTRATION:
                        $this->mail->setFrom($this->email, 'Boskartoteket Registrering');
                        $this->mail->Subject = 'Velkommen til Boskartoteket!';
                        break;
                    case self::MAIL_ORDER:
                        $this->mail->setFrom($this->email, 'Boskartoteket Ordre');
                        $this->mail->Subject = 'Her er din ordre';
                        break;
                    case self::MAIL_NOTIFICATION:
                        $this->mail->setFrom($this->email, 'Boskartoteket Notifikasjoner');
                        $this->mail->Subject = 'Du har en tømming snart!';
                        break;
                }
                $this->mail->Body = $template;

                $this->mail->send();

            }catch (\Exception $e) {
                echo 'Could not be sent ' . $this->mail->ErrorInfo;
            }
    }


    private function insertInformation($template): string {
        return $template;
    }

    /**
     *
     * This function should initiate the mailer and set default options
     * It's private and is therefore only used inside the class
     *
    */
    private function initMail(): void{
        try {
            $this->mail->SMTPDebug = 2;
            $this->mail->isSMTP();
            $this->mail->Host = 'smtp.gmail.com';
            $this->mail->SMTPAuth = true;
            $this->mail->Username = $this->email;
            $this->mail->Password = $this->email_key;
            $this->mail->SMTPSecure = 'tls';
            $this->mail->Port = 587;
        }catch (\Exception $e) {
            echo 'Could not be sent ' . $this->mail->ErrorInfo;
        }
    }

    private function load_email_key(): void {

        if(is_file('../../../.security/.emailkey')) {
            $key_file_content = file_get_contents('../../../.security/.emailkey');

            if(is_json($key_file_content)) {

                $content_array = json_decode($key_file_content, true);

                $this->email = $content_array['email'];
                $this->email_key = $content_array['password'];

            } else {
                echo 'Not a JSON file!';
            }
        } else {
            echo 'Not a file!';
        }

    }
    public static function order_email_content($string):string {
        $content = '
            <!DOCTYPE html>
            <html>
            <head>
            <style>
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            
            td, th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            
            tr:nth-child(even) {
              background-color: #dddddd;
            }
            </style>
            </head>
            <body>
            <table>
            <tr>
                <th>Produkt namn</th>
                <th>Mengd</th>
                <th>Pris</th>
                <th>Sum</th>
            </tr>
            
            '.
            $string
            .
            '
            </table>
            </body>
            </html>
        ';
        return $content;
    }

}

