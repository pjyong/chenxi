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
     * @ORM\OneToOne(targetEntity="ChenXi\ContentBundle\Entity\Text")
     * @ORM\JoinColumn(name="styleId", referencedColumnName="id")
     */
    private $style;

    /**
     * @ORM\Column(name="is_liquid", type="boolean", options={"default" = false})
     */
    private $isLiquid = false;

    /**
     * @ORM\Column(name="can_modify", type="boolean", options={"default" = false})
     */
    private $canModify = false;

    /**
     * @ORM\Column(name="min_width", type="smallint")
     */
    private $minWidth;

    /**
     * @ORM\Column(name="max_width", type="smallint")
     */
    private $maxWidth;

    
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

    /**
     * Set isLiquid
     *
     * @param boolean $isLiquid
     * @return ColumnTemplate
     */
    public function setIsLiquid($isLiquid)
    {
        $this->isLiquid = $isLiquid;
    
        return $this;
    }

    /**
     * Get isLiquid
     *
     * @return boolean 
     */
    public function getIsLiquid()
    {
        return $this->isLiquid;
    }

    /**
     * Set canModify
     *
     * @param boolean $canModify
     * @return ColumnTemplate
     */
    public function setCanModify($canModify)
    {
        $this->canModify = $canModify;
    
        return $this;
    }

    /**
     * Get canModify
     *
     * @return boolean 
     */
    public function getCanModify()
    {
        return $this->canModify;
    }

    /**
     * Set minWidth
     *
     * @param integer $minWidth
     * @return ColumnTemplate
     */
    public function setMinWidth($minWidth)
    {
        $this->minWidth = $minWidth;
    
        return $this;
    }

    /**
     * Get minWidth
     *
     * @return integer 
     */
    public function getMinWidth()
    {
        return $this->minWidth;
    }

    /**
     * Set maxWidth
     *
     * @param integer $maxWidth
     * @return ColumnTemplate
     */
    public function setMaxWidth($maxWidth)
    {
        $this->maxWidth = $maxWidth;
    
        return $this;
    }

    /**
     * Get maxWidth
     *
     * @return integer 
     */
    public function getMaxWidth()
    {
        return $this->maxWidth;
    }

    /**
     * Set style
     *
     * @param \ChenXi\ContentBundle\Entity\Text $style
     * @return ColumnTemplate
     */
    public function setStyle(\ChenXi\ContentBundle\Entity\Text $style = null)
    {
        $this->style = $style;
    
        return $this;
    }

    /**
     * Get style
     *
     * @return \ChenXi\ContentBundle\Entity\Text 
     */
    public function getStyle()
    {
        return $this->style;
    }
}