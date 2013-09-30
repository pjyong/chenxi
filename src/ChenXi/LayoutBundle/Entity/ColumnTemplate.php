<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
// pagePartId含义，1：header;2:body;3:footer
// columnPartId含义，每列的row序号
/**
 *
 * @ORM\Entity
 * @ORM\Table(name="column_template")
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

    /**
     * @ORM\Column(name="page_part_id", type="integer")
     */
    private $pagePartId;

    /**
     * @ORM\Column(name="column_part_id", type="integer")
     */
    private $columnPartId;

    /**
     * @ORM\OneToMany(targetEntity="ColumnTemplate", mappedBy="parentColumn")
     */
    private $childrenColumns;
    
    /**
     * @ORM\ManyToOne(targetEntity="ColumnTemplate", inversedBy="")
     * @ORM\JoinColumn(name="parent_column_id", referencedColumnName="id")
     */
    private $parentColumn;


    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->childrenColumns = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set pagePartId
     *
     * @param integer $pagePartId
     * @return ColumnTemplate
     */
    public function setPagePartId($pagePartId)
    {
        $this->pagePartId = $pagePartId;
    
        return $this;
    }

    /**
     * Get pagePartId
     *
     * @return integer 
     */
    public function getPagePartId()
    {
        return $this->pagePartId;
    }

    /**
     * Set columnPartId
     *
     * @param integer $columnPartId
     * @return ColumnTemplate
     */
    public function setColumnPartId($columnPartId)
    {
        $this->columnPartId = $columnPartId;
    
        return $this;
    }

    /**
     * Get columnPartId
     *
     * @return integer 
     */
    public function getColumnPartId()
    {
        return $this->columnPartId;
    }

    /**
     * Set page_template
     *
     * @param \ChenXi\LayoutBundle\Entity\PageTemplate $pageTemplate
     * @return ColumnTemplate
     */
    public function setPageTemplate(\ChenXi\LayoutBundle\Entity\PageTemplate $pageTemplate = null)
    {
        $this->page_template = $pageTemplate;
    
        return $this;
    }

    /**
     * Get page_template
     *
     * @return \ChenXi\LayoutBundle\Entity\PageTemplate 
     */
    public function getPageTemplate()
    {
        return $this->page_template;
    }

    /**
     * Add childrenColumns
     *
     * @param \ChenXi\LayoutBundle\Entity\ColumnTemplate $childrenColumns
     * @return ColumnTemplate
     */
    public function addChildrenColumn(\ChenXi\LayoutBundle\Entity\ColumnTemplate $childrenColumns)
    {
        $this->childrenColumns[] = $childrenColumns;
    
        return $this;
    }

    /**
     * Remove childrenColumns
     *
     * @param \ChenXi\LayoutBundle\Entity\ColumnTemplate $childrenColumns
     */
    public function removeChildrenColumn(\ChenXi\LayoutBundle\Entity\ColumnTemplate $childrenColumns)
    {
        $this->childrenColumns->removeElement($childrenColumns);
    }

    /**
     * Get childrenColumns
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getChildrenColumns()
    {
        return $this->childrenColumns;
    }

    /**
     * Set parentColumn
     *
     * @param \ChenXi\LayoutBundle\Entity\ColumnTemplate $parentColumn
     * @return ColumnTemplate
     */
    public function setParentColumn(\ChenXi\LayoutBundle\Entity\ColumnTemplate $parentColumn = null)
    {
        $this->parentColumn = $parentColumn;
    
        return $this;
    }

    /**
     * Get parentColumn
     *
     * @return \ChenXi\LayoutBundle\Entity\ColumnTemplate 
     */
    public function getParentColumn()
    {
        return $this->parentColumn;
    }
}