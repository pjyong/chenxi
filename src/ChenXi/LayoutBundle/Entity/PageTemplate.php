<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @ORM\Table(name="page_template")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class PageTemplate{

	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(name="content_type", type="string", length=50)
     */
    private $contentType;

    /**
     * @ORM\OneToMany(targetEntity="ColumnTemplate", mappedBy="page_template")
     */
    private $column_templates;

    /**
     * @ORM\ManyToOne(targetEntity="ChenXi\MainBundle\Entity\Website")
     * @ORM\JoinColumn(name="website_id", referencedColumnName="id")
     **/
    private $website;

    /**
     * @ORM\Column(name="is_primary", type="integer", options={"default" = 0})
     */
    private $isPrimary = 0;


}
