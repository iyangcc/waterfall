<?php
	header('Content-Type: text/html; charset=utf-8');
	
    // ��ȡjson�ļ�  string
	$jsonStr = file_get_contents('../info/data.json');

	// ת��Ϊ php���� array
	$totalArr = json_decode($jsonStr);

	// �������� �����ȡ 10��ֵ ���ص� ��һ�� ���key ����
	$randomKeys = array_rand($totalArr,10);

	// print_r($randomKeys);

	// ׼��һ���µ����� php�е����� ���� �ǿɱ��
	$newArr = array(); //����Ϊ0

	// ʹ�� �����key  ȥȡ �����ֵ count(����) ���Ի�ȡ php������ĳ���
	for ($i=0; $i <count($randomKeys) ; $i++) {
		// ��ȡ ���������е� ÿһ��key
		$key = $randomKeys[$i];

		// ʹ�� key �� �������� ��ȡ key��Ӧ��ֵ ����
		$obj = $totalArr[$key];

		// ����һ�� �µ�������
		$newArr[$i] = $obj;  //����ĳ��� ���� ��������ֵ�ĸ��� ���ı�
	}
	// ���Խ��
	// print_r($newArr);

	// ����10��ֵ ת��Ϊ json ��ʽ�ַ��� ���ظ������
	echo json_encode($newArr);
?>