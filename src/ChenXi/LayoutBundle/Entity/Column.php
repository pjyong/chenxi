<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/*
 *
 * @ORM\Table(name="column")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class Column{

	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;


    /**
     * @ORM\ManyToOne(targetEntity="Page", inversedBy="columns")
     * @ORM\JoinColumn(name="page_template_id", referencedColumnName="id")
     */
    private $page;

    

}
