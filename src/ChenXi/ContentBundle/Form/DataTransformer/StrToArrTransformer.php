<?php


namespace ChenXi\ContentBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

use Doctrine\Common\Collections\ArrayCollection;

class StrToArrTransformer implements DataTransformerInterface
{

    public function transform($dtObj)
    {
        if (null === $dtObj) {
            return "";
        }

        return '';
    }

    // return array
    public function reverseTransform($str)
    {
        if (!$str) {
            return null;
        }


    }
}