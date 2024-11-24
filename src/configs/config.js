import { FaBox } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { GiPencilBrush } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";

class Menu{
    constructor(name, icon, route){
        this.name = name;
        this.icon = icon;
        this.route = route;
    }
}

const configMenus = [
    new Menu('Item', FaBox, '/main/item'), 
    new Menu('Manage POS', GiPencilBrush, '/main/pos/manage'),
    new Menu('POS Report', GoGraph, '/main/pos/report'), 
    new Menu('Stock', HiDocumentReport, '/main/stock')
];

const allowedImageExtentions = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']


export  {configMenus, allowedImageExtentions};