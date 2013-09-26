<?php
namespace ChenXi\ContentBundle\Base;
/*
 * 为内容类型增加一个图片功能
 *
 */
interface Imaging
{
    function getContentType();

    function getContentId();

    function getImages();
}