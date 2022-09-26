# 通过图片路径筛选数据
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

# 取消ssl证书验证
import ssl

context = ssl._create_unverified_context()

html = urlopen('http://www.pythonscraping.com/pages/page3.html', context=context)
bs = BeautifulSoup(html, 'html.parser')
# images = bs.find_all('img', {
#     'src': re.compile('\.\.\/img\/gifts\/img.*\.jpg')
# })
# for image in images:
#     print(image['src'])

# lambda方法
print(bs.find_all(lambda tag: tag.get_text() == 'Or maybe he\'s only resting?'))