<?php
namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @ORM\Entity
 * @ORM\Table(name="template_box")
 */
class TemplateBox{
	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
	private $id;

	/**
     * @ORM\ManyToOne(targetEntity="BoxType")
     * @ORM\JoinColumn(name="box_type_id", referencedColumnName="id")
     */
	private $boxType;

	/**
     * @ORM\Column(name="position_id", type="integer")
     */
    private $positionId;

    /**
     * @ORM\OneToOne(targetEntity="ChenXi\ContentBundle\Entity\Text")
     * @ORM\JoinColumn(name="style_id", referencedColumnName="id")
     */
    private $style;

    /**
     * @ORM\OneToMany(targetEntity="TemplateBoxPropValue", mappedBy="templateBox", cascade={"persist", "remove"})
     */
    private $templateBoxPropValues;

    /**
     * @ORM\Column(name="can_remove", type="boolean", options={"default" = true})
     */
    private $canRemove = true;

    /**
     * @ORM\Column(name="can_modify", type="boolean", options={"default" = true})
     */
    private $canModify = true;

    /**
     * @ORM\ManyToOne(targetEntity="ColumnTemplate", inversedBy="templateBoxes")
     * @ORM\JoinColumn(name="column_template_id", referencedColumnName="id")
     */
    private $columnTemplate;


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
     * Set positionId
     *
     * @param integer $positionId
     * @return TemplateBox
     */
    public function setPositionId($positionId)
    {
        $this->positionId = $positionId;
    
        return $this;
    }

    /**
     * Get positionId
     *
     * @return integer 
     */
    public function getPositionId()
    {
        return $this->positionId;
    }

    /**
     * Set canRemove
     *
     * @param boolean $canRemove
     * @return TemplateBox
     */
    public function setCanRemove($canRemove)
    {
        $this->canRemove = $canRemove;
    
        return $this;
    }

    /**
     * Get canRemove
     *
     * @return boolean 
     */
    public function getCanRemove()
    {
        return $this->canRemove;
    }

    /**
     * Set canModify
     *
     * @param boolean $canModify
     * @return TemplateBox
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
     * Set boxType
     *
     * @param \ChenXi\LayoutBundle\Entity\BoxType $boxType
     * @return TemplateBox
     */
    public function setBoxType(\ChenXi\LayoutBundle\Entity\BoxType $boxType = null)
    {
        $this->boxType = $boxType;
    
        return $this;
    }

    /**
     * Get boxType
     *
     * @return \ChenXi\LayoutBundle\Entity\BoxType 
     */
    public function getBoxType()
    {
        return $this->boxType;
    }

    /**
     * Set style
     *
     * @param \ChenXi\ContentBundle\Entity\Text $style
     * @return TemplateBox
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
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->templateBoxPropValues = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Add templateBoxPropValues
     *
     * @param \ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues
     * @return TemplateBox
     */
    public function addTemplateBoxPropValue(\ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues)
    {
        $this->templateBoxPropValues[] = $templateBoxPropValues;
    
        return $this;
    }

    /**
     * Remove templateBoxPropValues
     *
     * @param \ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues
     */
    public function removeTemplateBoxPropValue(\ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues)
    {
        $this->templateBoxPropValues->removeElement($templateBoxPropValues);
    }

    /**
     * Get templateBoxPropValues
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTemplateBoxPropValues()
    {
        return $this->templateBoxPropValues;
    }

    /**
     * Set columnTemplate
     *
     * @param \ChenXi\LayoutBundle\Entity\ColumnTemplate $columnTemplate
     * @return TemplateBox
     */
    public function setColumnTemplate(\ChenXi\LayoutBundle\Entity\ColumnTemplate $columnTemplate = null)
    {
        $this->columnTemplate = $columnTemplate;
    
        return $this;
    }

    /**
     * Get columnTemplate
     *
     * @return \ChenXi\LayoutBundle\Entity\ColumnTemplate 
     */
    public function getColumnTemplate()
    {
        return $this->columnTemplate;
    }
}