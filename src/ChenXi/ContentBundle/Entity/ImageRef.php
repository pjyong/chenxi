<?php
namespace ChenXi\ContentBundle\Entity;

use ChenXi\ContentBundle\Interface\Imaging;
/**
 * ChenXi\ContentBundle\Entity\ImageRef
 *
 * @ORM\Table(name="image_ref")
 * @ORM\Entity
 */
class ImageRef
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Image")
     * @ORM\JoinColumn(name="image_id", referencedColumnName="id")
     **/
    protected $image;

    /**
     * @var string
     *
     * @ORM\Column(name="content_type", type="string", length=50)
     */
    protected $contentType;

    /**
     * @var integer
     *
     * @ORM\Column(name="content_id", type="integer")
     */
    protected $contentId;

    /**
     * Constructor
     */
    public function __construct(Image $image = null, Imaging $content = null)
    {
        if ($image != null) {
            $this->setImage($image);
        }

        if ($content != null) {
            $this->setContent($content);
        }
    }

    public function getId()
    {
        return $this->id;
    }

    public function setImage(Image $image)
    {
        $this->image = $image;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setContent(Imaging $content)
    {
        $this->contentType = $content->getContentType();
        $this->contentId = $content->getContentId();
    }

    public function getContentType()
    {
        return $this->contentType;
    }

    public function getContentId()
    {
        return $this->contentId;
    }
}