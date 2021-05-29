# -*- coding: utf-8 -*-
"""GAN train.ipynb

Automatically generated by Colaboratory.

"""

!pip install tensorboardX

!pip install torch==1.1.0
!pip install torchvision==0.3.0

!pip install pillow==6

from google.colab import drive
drive.mount('/content/drive')

!git clone https://github.com/TheLethargicOwl/viton-gan.git

import sys
import argparse

ls

!unzip '/content/drive/My Drive/viton_resize.zip'

cd /content/viton-gan/viton_gan

!cp '/content/viton_resize' -r '/content/viton-gan/viton_gan'

opt = argparse.Namespace(checkpoint = '/content/drive/My Drive/checkpoints/gmm_train_new/gmm_final.pth',
                         data_root = '/content/viton-gan/viton_gan/viton_resize',
                         out_dir = '/content/viton-gan/viton_gan/results',
                         name = 'GMM',
                         batch_size = 16,
                         n_worker = 4,
                         gpu_id = '0',
                         log_freq = 100,
                         radius = 5,
                         fine_width = 192,
                         fine_height = 256,
                         grid_size = 5)

from run_gmm import *

model = GMM(opt)
load_checkpoint(model, opt.checkpoint)
model.cuda()
model.eval()
modes = ['val']
for mode in modes:
	print('Run on {} data'.format(mode.upper()))
	dataset = GMMDataset(opt, mode, data_list=mode+'_pairs.txt', train=False)
	dataloader = DataLoader(dataset, batch_size=opt.batch_size, num_workers=opt.n_worker, shuffle=False)   
	with torch.no_grad():
		run(opt, model, dataloader, mode)
print('Successfully completed')

opt = argparse.Namespace(checkpoint = '/content/drive/My Drive/checkpoints/tom_train_new/tom_final.pth',
                         data_root = '/content/viton-gan/viton_gan/viton_resize',
                         out_dir = '/content/viton-gan/viton_gan/output',
                         name = 'TOM',
                         batch_size = 16,
                         n_worker = 4,
                         gpu_id = '0',
                         log_freq = 100,
                         radius = 5,
                         fine_width = 192,
                         fine_height = 256,
                         grid_size = 5)

from run_tom import *

model = UnetGenerator(25, 4, 6, ngf=64, norm_layer=nn.InstanceNorm2d)
load_checkpoint(model, opt.checkpoint)
model.cuda()
model.eval()
mode = 'val'
print('Run on {} data'.format(mode.upper()))
dataset = TOMDataset(opt, mode, data_list=mode+'_pairs.txt', train=False)
dataloader = DataLoader(dataset, batch_size=opt.batch_size, num_workers=opt.n_worker, shuffle=False)   
with torch.no_grad():
	run(opt, model, dataloader, mode)
print('Successfully completed')

from PIL import Image

im = Image.open("/content/viton-gan/viton_gan/output/TOM/val/000650_1.jpg")
width, height = im.size  
  
# Setting the points for cropped image  
left = width / 3
top = 2 * height / 3
right = 2 * width / 3
bottom = height
  
# Cropped image of above dimension  
# (It will not change orginal image)  
im1 = im.crop((left, top, right, bottom)) 
newsize = (200, 300) 
im1 = im1.resize(newsize) 
# Shows the image in image viewer  
im1.save('image.png')
im1
