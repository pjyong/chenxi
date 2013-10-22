<?php
namespace ChenXi\LayoutBundle\BoxType;
use ChenXi\LayoutBundle\Entity\TemplateBox;
use Symfony\Component\HttpFoundation\Request;

Interface BoxTypeInterface
{
	
	// 显示新创建的模板区块配置界面
	public function displayTemplateBoxForm(TemplateBox $templateBox);

	// 处理模板区块表单
	public function handleTemplateBoxForm(Request $request);

	// // 显示新创建的网站区块配置界面
	// public function displayWebsiteBoxForm();

	// // 处理网站区块表单
	// public function handleWebsiteBoxForm(Request $request);

	// // 显示新创建的区块前台界面
	// public function displayBox();

	// 将新创建的区块类型保存进数据库
	public function persistToDB();

	// 获取新创建的区块
	public function getBoxType();
}