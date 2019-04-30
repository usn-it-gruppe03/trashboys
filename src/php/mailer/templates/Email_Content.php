<?php
/**
 * Created by PhpStorm.
 * User: Simon
 */


class Email_Content
{
    public static function reg_order_email($string, $name, $order_nr, $address, $time):string {
        $content = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
        a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
</head>
<style>


    #outlook a {
        padding: 0;
    }

    .ExternalClass {
        width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
    }

    .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
    }

    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
    }


    /*
    END OF IMPORTANT
    */

    html,
    body {
        width: 100%;
        font-family: Arial, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse;
        border-spacing: 0px;
    }

    table td,
    html,
    body,
    .es-wrapper {
        padding: 0;
        Margin: 0;
    }

    .es-content,
    .es-header,
    .es-footer {
        table-layout: fixed !important;
        width: 100%;
    }

    img {
        display: block;
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
    }

    table tr {
        border-collapse: collapse;
    }

    p,
    hr {
        Margin: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        Margin: 0;
        line-height: 120%;
        mso-line-height-rule: exactly;
        font-family: Arial, sans-serif;
    }

    p,
    ul li,
    ol li,
    a {
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        mso-line-height-rule: exactly;
    }

    .es-left {
        float: left;
    }

    .es-right {
        float: right;
    }

    .es-p5 {
        padding: 5px;
    }

    .es-p5t {
        padding-top: 5px;
    }

    .es-p5b {
        padding-bottom: 5px;
    }

    .es-p5l {
        padding-left: 5px;
    }

    .es-p5r {
        padding-right: 5px;
    }

    .es-p10 {
        padding: 10px;
    }

    .es-p10t {
        padding-top: 10px;
    }

    .es-p10b {
        padding-bottom: 10px;
    }

    .es-p10l {
        padding-left: 10px;
    }

    .es-p10r {
        padding-right: 10px;
    }

    .es-p15 {
        padding: 15px;
    }

    .es-p15t {
        padding-top: 15px;
    }

    .es-p15b {
        padding-bottom: 15px;
    }

    .es-p15l {
        padding-left: 15px;
    }

    .es-p15r {
        padding-right: 15px;
    }

    .es-p20 {
        padding: 20px;
    }

    .es-p20t {
        padding-top: 20px;
    }

    .es-p20b {
        padding-bottom: 20px;
    }

    .es-p20l {
        padding-left: 20px;
    }

    .es-p20r {
        padding-right: 20px;
    }

    .es-p25 {
        padding: 25px;
    }

    .es-p25t {
        padding-top: 25px;
    }

    .es-p25b {
        padding-bottom: 25px;
    }

    .es-p25l {
        padding-left: 25px;
    }

    .es-p25r {
        padding-right: 25px;
    }

    .es-p30 {
        padding: 30px;
    }

    .es-p30t {
        padding-top: 30px;
    }

    .es-p30b {
        padding-bottom: 30px;
    }

    .es-p30l {
        padding-left: 30px;
    }

    .es-p30r {
        padding-right: 30px;
    }

    .es-p35 {
        padding: 35px;
    }

    .es-p35t {
        padding-top: 35px;
    }

    .es-p35b {
        padding-bottom: 35px;
    }

    .es-p35l {
        padding-left: 35px;
    }

    .es-p35r {
        padding-right: 35px;
    }

    .es-p40 {
        padding: 40px;
    }

    .es-p40t {
        padding-top: 40px;
    }

    .es-p40b {
        padding-bottom: 40px;
    }

    .es-p40l {
        padding-left: 40px;
    }

    .es-p40r {
        padding-right: 40px;
    }

    .es-menu td {
        border: 0;
    }

    .es-menu td a img {
        display: inline !important;
    }


    /*
    END CONFIG STYLES
    */

    a {
        font-family: Arial, sans-serif;
        font-size: 14px;
        text-decoration: none;
    }

    h1 {
        font-size: 30px;
        font-style: normal;
        font-weight: normal;
        color: #333333;
    }

    h1 a {
        font-size: 30px;
    }

    h2 {
        font-size: 24px;
        font-style: normal;
        font-weight: normal;
        color: #333333;
    }

    h2 a {
        font-size: 24px;
    }

    h3 {
        font-size: 20px;
        font-style: normal;
        font-weight: bold;
        color: #333333;
    }

    h3 a {
        font-size: 20px;
    }

    p,
    ul li,
    ol li {
        font-size: 14px;
        font-family: Arial, sans-serif;
        line-height: 150%;
    }

    ul li,
    ol li {
        Margin-bottom: 15px;
    }

    .es-menu td a {
        text-decoration: none;
        display: block;
    }

    .es-wrapper {
        width: 100%;
        height: 100%;
        background-image: ;
        background-repeat: repeat;
        background-position: center top;
    }

    .es-wrapper-color {
        background-color: #555555;
    }

    .es-content-body {
        background-color: #f8f8f8;
    }

    .es-content-body p,
    .es-content-body ul li,
    .es-content-body ol li {
        color: #333333;
    }

    .es-content-body a {
        color: #3ca7f1;
    }

    .es-header {
        background-color: transparent;
        background-image: ;
        background-repeat: repeat;
        background-position: center top;
    }

    .es-header-body {
        background-color: transparent;
    }

    .es-header-body p,
    .es-header-body ul li,
    .es-header-body ol li {
        color: #a0a7ac;
        font-size: 14px;
    }

    .es-header-body a {
        color: #a0a7ac;
        font-size: 14px;
    }

    .es-footer {
        background-color: transparent;
        background-image: ;
        background-repeat: repeat;
        background-position: center top;
    }

    .es-footer-body {
        background-color: #242424;
    }

    .es-footer-body p,
    .es-footer-body ul li,
    .es-footer-body ol li {
        color: #888888;
        font-size: 13px;
    }

    .es-footer-body a {
        color: #aaaaaa;
        font-size: 13px;
    }

    .es-infoblock,
    .es-infoblock p,
    .es-infoblock ul li,
    .es-infoblock ol li {
        line-height: 120%;
        font-size: 12px;
        color: #a0a7ac;
    }

    .es-infoblock a {
        font-size: 12px;
        color: #a0a7ac;
    }

    a.es-button {
        border-style: solid;
        border-color: #242424;
        border-width: 10px 20px 10px 20px;
        display: inline-block;
        background: #242424;
        border-radius: 20px;
        font-size: 18px;
        font-family: "lucida sans unicode", "lucida grande", sans-serif;
        font-weight: normal;
        font-style: normal;
        line-height: 120%;
        color: #ffffff;
        text-decoration: none;
        width: auto;
        text-align: center;
    }

    .es-button-border {
        border-style: solid solid solid solid;
        border-color: #242424 #242424 #242424 #242424;
        background: #2cb543;
        border-width: 0px 0px 0px 0px;
        display: inline-block;
        border-radius: 20px;
        width: auto;
    }


    @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
            font-size: 16px !important;
            line-height: 150% !important;
        }
        h1 {
            font-size: 30px !important;
            text-align: center;
            line-height: 120% !important;
        }
        h2 {
            font-size: 26px !important;
            text-align: center;
            line-height: 120% !important;
        }
        h3 {
            font-size: 20px !important;
            text-align: center;
            line-height: 120% !important;
        }
        h1 a {
            font-size: 30px !important;
        }
        h2 a {
            font-size: 26px !important;
        }
        h3 a {
            font-size: 20px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
            font-size: 16px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
            font-size: 16px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
            font-size: 12px !important;
        }
        *[class="gmail-fix"] {
            display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
            text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
            text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
            text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
            display: inline !important;
        }
        .es-button-border {
            display: block !important;
        }
        a.es-button {
            font-size: 20px !important;
            display: block !important;
            border-width: 10px 20px 10px 20px !important;
        }
        .es-btn-fw {
            border-width: 10px 0px !important;
            text-align: center !important;
        }
        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
            width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
            width: 100% !important;
            max-width: 600px !important;
        }
        .es-adapt-td {
            display: block !important;
            width: 100% !important;
        }
        .adapt-img {
            width: 100% !important;
            height: auto !important;
        }
        .es-m-p0 {
            padding: 0px !important;
        }
        .es-m-p0r {
            padding-right: 0px !important;
        }
        .es-m-p0l {
            padding-left: 0px !important;
        }
        .es-m-p0t {
            padding-top: 0px !important;
        }
        .es-m-p0b {
            padding-bottom: 0 !important;
        }
        .es-m-p20b {
            padding-bottom: 20px !important;
        }
        .es-mobile-hidden,
        .es-hidden {
            display: none !important;
        }
        .es-desk-hidden {
            display: table-row!important;
            width: auto!important;
            overflow: visible!important;
            float: none!important;
            max-height: inherit!important;
            line-height: inherit!important;
        }
        .es-desk-menu-hidden {
            display: table-cell!important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
            width: auto !important;
        }
        table.es-social {
            display: inline-block !important;
        }
        table.es-social td {
            display: inline-block !important;
        }

    }



    /*
    END RESPONSIVE STYLES
    */
</style>
<body>
<div class="es-wrapper-color">
    <!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#555555"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
            <td class="esd-email-paddings" valign="top">
                <table class="esd-header-popover es-content" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                    <tr>
                        <td class="esd-stripe" align="center">
                            <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                <tr>
                                    <td class="esd-structure es-p5b es-p10r es-p10l" esd-general-paddings-checked="false" align="left">
                                        <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="280" valign="top"><![endif]-->
                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                            <tbody>
                                            <tr>
                                                <td class="es-m-p0r es-m-p20b esd-container-frame" width="280" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text es-infoblock" align="left">
                                                                <p><br></p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td><td width="20"></td><td width="280" valign="top"><![endif]-->
                                        <table cellspacing="0" cellpadding="0" align="right">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="280" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td></tr></table><![endif]-->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                    <tr>
                        <td class="esd-stripe" align="center">
                            <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                <tr>
                                    <td class="esd-structure es-p20t es-p20b es-p10r es-p10l" style="background-color: rgb(25, 25, 25);" esd-general-paddings-checked="false" bgcolor="#191919" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="580" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" class="esd-block-text">
                                                                <p style="font-size: 20px; color: #ffffff;">BOSKARTOTEKET</p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" esd-general-paddings-checked="false" style="background-color: rgb(255, 204, 153);" bgcolor="#ffcc99" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="560" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text es-p15t es-p15b" align="center">
                                                                <div class="esd-text">
                                                                    <h2 style="color: #242424;"><span style="font-size:30px;"><strong>Din ordre er stadfesta</strong></span></h2>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-block-text es-p10l" align="center">
                                                                <p style="color: #242424;">Hei '.$name.', din ordre '.$order_nr.' blir&nbsp;no behandla..</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-block-button es-p15t es-p15b es-p10r es-p10l" align="center"> <span class="es-button-border" style="border-radius: 20px; background: rgb(25, 25, 25) none repeat scroll 0% 0%; border-style: solid; border-color: rgb(44, 181, 67); border-width: 0px;"> <a href="https://viewstripo.email/" class="es-button" target="_blank" style="border-radius: 20px; font-family: lucida sans unicode,lucida grande,sans-serif; font-weight: normal; font-size: 18px; border-width: 10px 35px; background: rgb(25, 25, 25) none repeat scroll 0% 0%; border-color: rgb(25, 25, 25); color: rgb(255, 255, 255);">SJÅ ORDREDETALJAR</a> </span> </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p15t es-p10b es-p10r es-p10l" style="background-color: rgb(248, 248, 248);" esd-general-paddings-checked="false" bgcolor="#f8f8f8" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="580" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text" align="center">
                                                                <h2 style="color: #191919;">Produktar bestilt</h2>
                                                                <table style="border-collapse: collapse;
              width: 100%;">
                                                                    <tr>
                                                                        <th style="text-align: left;padding: 8px;">Produktnamn</th>
                                                                        <th style="text-align: left;padding: 8px;">Mengd</th>
                                                                        <th style="text-align: left;padding: 8px;">Pris</th>
                                                                        <th style="text-align: left;padding: 8px;">Sum</th>
                                                                    </tr>

                                                                    '.
                                                                    $string
                                                                    .
                                                                    '
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p25t es-p5b es-p20r es-p20l" esd-general-paddings-checked="false" style="background-color: rgb(248, 248, 248);" bgcolor="#f8f8f8" align="left">
                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                            <tbody>
                                            <tr>
                                                <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="270" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text" align="left">
                                                                <p><br></p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-block-text es-p20t" align="left">
                                                                <p style="font-size: 15px;"></p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td></tr></table><![endif]-->
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p10t es-p10b es-p10r es-p10l" style="background-color: rgb(248, 248, 248);" esd-general-paddings-checked="false" bgcolor="#f8f8f8" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="580" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-spacer es-p20t es-p20b es-p10r es-p10l" bgcolor="#f8f8f8" align="center">
                                                                <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td style="border-bottom: 1px solid rgb(25, 25, 25); background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p15t es-p10b es-p10r es-p10l" style="background-color: rgb(238, 238, 238);" esd-general-paddings-checked="false" bgcolor="#eeeeee" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="580" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text" align="center">
                                                                <h2 style="color: #191919;">Ordre & Adresse</h2>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p10t es-p30b es-p20r es-p20l" esd-general-paddings-checked="false" style="background-color: rgb(238, 238, 238);" bgcolor="#eeeeee" align="left">
                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                            <tbody>
                                            <tr>
                                                <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text es-p10t es-p10b" align="left">
                                                                <h3 style="color: #242424;">Ordre detaljar</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-block-text" align="left">
                                                                <p><strong>Ordre&nbsp;nr:</strong>&nbsp;'.$order_nr.'<br></p>
                                                                <p><strong>Ordre dato: '.$time.'</strong></p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="270" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text es-p10t es-p10b" align="left">
                                                                <h3 style="color: #242424;">Adresse</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-block-text" align="left">
                                                                <p>'.$name.'</p>
                                                                <p>'.$address.'</p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td></tr></table><![endif]-->
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p25t es-p30b es-p20r es-p20l" esd-general-paddings-checked="false" style="background-color: rgb(248, 248, 248);" bgcolor="#f8f8f8" align="left">
                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                            <tbody>
                                            <tr>
                                                <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text es-p10b" align="center">
                                                                <h3 style="color: #242424;">Lurar du på noko?</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-block-text" align="center">
                                                                <p style="line-height: 150%; color: #242424;"><a href="maito:boskartoteket@gmail.com">BOSKARTOTEKET@GMAIL.COM</p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="270" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if mso]></td></tr></table><![endif]-->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                    <tr>
                        <td class="esd-stripe" align="center">
                            <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                <tr>
                                    <td class="esd-structure es-p20" esd-general-paddings-checked="false" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="560" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td class="esd-block-text" align="center">
                                                                <p>
                                                                    <font color="#aaaaaa"><b>LINKTILHJEMMESIDE</b></font>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-block-text es-p10t es-p10b" align="center">
                                                                <p><em><span style="font-size: 11px; line-height: 150%;">Du får denna e-post fordi du har bestilt produktar frå vår nettside</span></em></p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                    <tr>
                        <td class="esd-stripe" align="center">
                            <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                <tr>
                                    <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="esd-container-frame" width="560" valign="top" align="center">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</body>

</html>';

        return $content;
    }

    public static function reg_not_email($name, $address, $array) {
        //$outArray = echof($array);
        $string = 'Hei! <b>'.$name.'</b>
                  <br> I morgon hentes bos på din adresse: <b>'.$address. '</b>
                  <br> Det blir henta: <b>' . $array . '</b>';

        return $string;
    }

}