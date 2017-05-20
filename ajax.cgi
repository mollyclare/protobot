#!/usr/bin/python
import cgitb
cgitb.enable()
import cgi
import glob
import random
import sys
import simplejson as json

sys.path.append('./lib')


import wordlist 



def _pick(l):
	return random.choice(l)

def sentence():

	item = _pick(wordlist.ITEM)
	constraint = _pick(wordlist.CONSTRAINT)

	if isinstance(item, tuple):
		plural = item[1]
		item = item[0]
	else:
		plural = False
	
	if plural:
		intro = "Design"
	else:
		intro = "Design a"
	return intro, item, constraint

def ajax():
	intro, item, constraint = sentence()
	data = {
		'intro': intro,
		'design-item': item,
		'constraint': constraint
	}
	print "Content-type: text/json\n"

	print json.dumps(data)



def main():
	ajax()


if __name__ == '__main__':
	main()
