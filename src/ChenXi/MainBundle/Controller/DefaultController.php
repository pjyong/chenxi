<?php

namespace ChenXi\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use FOS\OAuthServerBundle\Document\ClientManager;
use Symfony\Component\HttpFoundation\RedirectResponse;


class DefaultController extends Controller
{
    public function indexAction()
    {
    	// persist session id into cookie
    	// $session = new Session();
    	// $session->setName('chenxi');
		// $session->start();

		// $cookie = new Cookie('aaaa', $session->getId());
		// save cookie
		// $response = new Response();
		// $response->headers->setCookie(new Cookie('websiteId', 1, time() + 3600 * 24 * 7, '/', null, false, false));
		// $response->send();
		// $session->set('websiteId', 1);


        $securityContext = $this->container->get('security.context');
        if( ! $securityContext->isGranted('IS_AUTHENTICATED_FULLY') ){
            // go login page
            return $this->redirect($this->generateUrl('fos_user_security_login'));
        }

        return $this->render('ChenXiMainBundle:Default:index.html.twig');
    }

    
    public function testAction()
    {
    	return new Response('this is test page');
    }
}
