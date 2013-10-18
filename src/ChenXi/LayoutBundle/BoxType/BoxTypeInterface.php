<?php
namespace ChenXi\LayoutBundle\BoxType;


Interface BoxTypeInterface
{
	// 将新创建的区块类型保存进数据库
	public function persistToDB();

	public function getBoxType();
}