<?php

namespace ChenXi\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ChenXiUserBundle:Default:index.html.twig', array('name' => $name));
    }
}
