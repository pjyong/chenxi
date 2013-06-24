<?php

namespace ChenXi\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('ChenXiMainBundle:Default:index.html.twig');
    }
}
