<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/*
 *
 * @ORM\Table(name="column_template")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class ColumnTemplate{

	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;


    /**
     * @ORM\ManyToOne(targetEntity="PageTemplate", inversedBy="column_templates")
     * @ORM\JoinColumn(name="page_template_id", referencedColumnName="id")
     */
    private $page_template;

    

}
