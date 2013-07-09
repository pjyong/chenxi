<?php

namespace ChenXi\TagBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ChenXiTagBundle:Default:index.html.twig', array('name' => $name));
    }
}
