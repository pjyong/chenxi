<?php

namespace ChenXi\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class ChenXiUserBundle extends Bundle
{
	public function getParent()
    {
        return 'FOSUserBundle';
    }
}
