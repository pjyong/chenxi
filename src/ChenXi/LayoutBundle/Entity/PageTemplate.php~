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
     * @ORM\OneToMany(targetEntity="ColumnTemplate", mappedBy="pageTemplate")
     */
    private $columnTemplates;

    /**
     * @ORM\ManyToOne(targetEntity="ChenXi\MainBundle\Entity\Website")
     * @ORM\JoinColumn(name="website_id", referencedColumnName="id")
     **/
    private $website;

    /**
     * @ORM\Column(name="is_primary", type="boolean", options={"default" = false})
     */
    private $isPrimary = false;


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->column_templates = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return PageTemplate
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set contentType
     *
     * @param string $contentType
     * @return PageTemplate
     */
    public function setContentType($contentType)
    {
        $this->contentType = $contentType;
    
        return $this;
    }

    /**
     * Get contentType
     *
     * @return string 
     */
    public function getContentType()
    {
        return $this->contentType;
    }

    /**
     * Set isPrimary
     *
     * @param integer $isPrimary
     * @return PageTemplate
     */
    public function setIsPrimary($isPrimary)
    {
        $this->isPrimary = $isPrimary;
    
        return $this;
    }

    /**
     * Get isPrimary
     *
     * @return integer 
     */
    public function getIsPrimary()
    {
        return $this->isPrimary;
    }

    /**
     * Add column_templates
     *
     * @param \ChenXi\LayoutBundle\Entity\ColumnTemplate $columnTemplates
     * @return PageTemplate
     */
    public function addColumnTemplate(\ChenXi\LayoutBundle\Entity\ColumnTemplate $columnTemplates)
    {
        $this->column_templates[] = $columnTemplates;
    
        return $this;
    }

    /**
     * Remove column_templates
     *
     * @param \ChenXi\LayoutBundle\Entity\ColumnTemplate $columnTemplates
     */
    public function removeColumnTemplate(\ChenXi\LayoutBundle\Entity\ColumnTemplate $columnTemplates)
    {
        $this->column_templates->removeElement($columnTemplates);
    }

    /**
     * Get column_templates
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getColumnTemplates()
    {
        return $this->columnTemplates;
    }

    /**
     * Set website
     *
     * @param \ChenXi\MainBundle\Entity\Website $website
     * @return PageTemplate
     */
    public function setWebsite(\ChenXi\MainBundle\Entity\Website $website = null)
    {
        $this->website = $website;
    
        return $this;
    }

    /**
     * Get website
     *
     * @return \ChenXi\MainBundle\Entity\Website 
     */
    public function getWebsite()
    {
        return $this->website;
    }
}