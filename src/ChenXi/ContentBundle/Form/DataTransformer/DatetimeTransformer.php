<?php


namespace ChenXi\ContentBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class DatetimeTransformer implements DataTransformerInterface
{

    public function transform($dtObj)
    {
        if (null === $dtObj) {
            return "";
        }

        return '';
    }

    
    public function reverseTransform($dtStr)
    {
        if (!$dtStr) {
            return null;
        }

        return new \DateTime($dtStr);
    }
}