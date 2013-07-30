<?php
namespace ChenXi\UserBundle\EventListener;

use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class SecurityListener
{
    public function __construct(SecurityContext $security, Session $session)
    {
        $this->security = $security;
        $this->session = $session;
    }

    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event)
    {
        //
        $websiteId = 1;

        // begin the session
        $this->session->set('websiteId', $websiteId);
        
        // begin the cookie
        


    }
}