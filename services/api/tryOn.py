from PIL import Image
from script import predict


def virtual_tryon(user_id,selected_id):
    f = open("./Database/val_pairs.txt" , "w")    
    f.write(user_id+".jpg "+selected_id+"_1.jpg")
    f.close()
    predict()
    im = Image.open("./output/second/TOM/val/" + selected_id + "_1.jpg")
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
    result_url="/output/second/TOM/val/" + selected_id + user_id + ".jpg"
    im1.save("."+result_url)
    return result_url