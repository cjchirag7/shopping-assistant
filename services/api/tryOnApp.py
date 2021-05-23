from PIL import Image
from script import predict
import time
from evaluate import execute
from pose_parser import pose_parse

#Item Id:'',['000003','000011','000013','000108','000254','000308','000627','001247','001401','000649','001500','001719','002061','002337','002385','002599','003086','005632','006158','006159']
def virtual_tryon(user_id,user_path,selected_id):
    # from PIL import Image
    person=Image.open(user_path)
    req_size = (192,256)
    if person.size!=req_size:
        person = person.resize(req_size)
    person.save("./Database/val/person/"+user_id+".jpg")
    pose_parse(user_id)
    execute()
    f = open("./Database/val_pairs.txt" , "w")    
    f.write(user_id+".jpg "+selected_id+"_1.jpg")
    f.close()
    predict()
    # from PIL import Image
    im = Image.open("./output/second/TOM/val/" + selected_id + "_1.jpg")
    width, height = im.size  
    
    # # Setting the points for cropped image  
    left = width / 3
    top = 2 * height / 3
    right = 2 * width / 3
    bottom = height
    
    # # Cropped image of above dimension  
    # # (It will not change orginal image)  
    im1 = im.crop((left, top, right, bottom)) 
    newsize = (200, 300) 
    im1 = im1.resize(newsize) 
    result_url="/output/second/TOM/val/" + selected_id + user_id + ".jpg"
    im1.save("."+result_url)
    return result_url