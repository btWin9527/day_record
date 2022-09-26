from bs4 import BeautifulSoup
from urllib.request import urlopen

import ssl

context = ssl._create_unverified_context()

html = urlopen('http://www.pythonscraping.com/pages/page3.html', context=context)
bs = BeautifulSoup(html, 'html.parser')

# 处理子标签和其它后代标签
# for child in bs.find('table', {'id': 'giftList'}).children:
#     print(child, 'child')

# 处理兄弟标签
# 返回表格中除了标题行的数据
# for sibling in bs.find('table', {'id': 'giftList'}).tr.next_siblings:
#     print(sibling, 'sibling')

# 处理父标签
# 选择td标签的前一个兄弟标签previous_sibling
print(bs.find('img',
              {'src': '../img/gifts/img1.jpg'}).parent.previous_sibling.get_text())
