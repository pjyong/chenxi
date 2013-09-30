<?php

namespace ChenXi\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;



/**
 * ChenXi\ContentBundle\Entity\Text
 *
 * @ORM\Table(name="text")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class Text
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
}