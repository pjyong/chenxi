<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @ORM\Table(name="page_template")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class Page{

	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $contentType;

    /**
     * @ORM\OneToMany(targetEntity="Column", mappedBy="page")
     */
    private $columns;

}
