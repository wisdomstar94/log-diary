from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[4]
OUT = Path(__file__).resolve().parent.parent
SRC = OUT / "sources"
BRAND = ROOT / "packages/apps/log-diary/assets/images"
FONTS = ROOT / "node_modules/@expo-google-fonts/ibm-plex-sans-kr"
IVORY, TERRA, INK, SUB = "#f5f3ef", "#b05139", "#1d1c1a", "#6e6b65"


def font(size, weight=600):
    folder = {400: "400Regular", 500: "500Medium", 600: "600SemiBold", 700: "700Bold"}[weight]
    return ImageFont.truetype(str(FONTS / folder / f"IBMPlexSansKR_{folder}.ttf"), size)


def text(draw, xy, value, size, fill=INK, weight=600):
    draw.text(xy, value, font=font(size, weight), fill=fill, anchor="lt", spacing=12)


def paste_fit(canvas, asset, box):
    x, y, w, h = box
    im = asset.copy()
    im.thumbnail((w, h), Image.Resampling.LANCZOS)
    canvas.paste(im, (round(x + (w-im.width)/2), round(y + (h-im.height)/2)), im if im.mode == "RGBA" else None)


def render_icon():
    icon = Image.open(BRAND / "icon.png").convert("RGBA").resize((512,512), Image.Resampling.LANCZOS)
    icon.save(OUT / "app-icon-512.png", optimize=True)


def render_feature():
    bg = Image.open(SRC / "paper-background.png").convert("RGB").resize((1024,500), Image.Resampling.LANCZOS)
    d = ImageDraw.Draw(bg)
    logo = Image.open(BRAND / "logo.png").convert("RGBA")
    paste_fit(bg, logo, (53, 79, 220, 55))
    text(d, (78,195), "순간을 적고,", 48, weight=700)
    text(d, (78,260), "하루를 남기다", 48, weight=700)
    text(d, (80,348), "소소한 일상이 나만의 기록으로", 20, SUB, 400)
    d.line((620,161,620,361), fill="#d9b4a4", width=2)
    for y, tm, title in [(166,"08:20","커피 한 잔으로 시작한 아침"),(255,"12:40","산책길에서 발견한 작은 꽃"),(344,"22:00","오늘도 수고한 나에게")]:
        d.ellipse((615,y-5,625,y+5),fill=TERRA)
        text(d,(645,y-12),tm,17,TERRA,600)
        text(d,(645,y+17),title,19,INK,500)
    bg.save(OUT / "feature-graphic-1024x500.png", optimize=True)


PANELS = [
    ("01-day-timeline", "하루의 순간을 시간순으로", "짧은 기록이 모여 나만의 하루가 됩니다", "day.png"),
    ("02-quick-compose", "떠오를 때, 간편하게 기록", "시간과 함께 지금의 생각을 남겨 보세요", "compose.png"),
    ("03-month-calendar", "쌓인 하루를 한눈에", "달력에서 기록한 날을 쉽게 돌아보세요", "calendar.png"),
    ("04-record-search", "지난 순간을 다시 찾기", "기억나는 단어로 내 기록을 찾아보세요", "search.png"),
]


def render_panel(index, slug, headline, subtitle, source):
    im = Image.new("RGB", (1080,1920), IVORY)
    d = ImageDraw.Draw(im)
    text(d,(68,62),"로그일기",24,TERRA,700)
    n=f"0{index} / 04"
    d.text((1012,62),n,font=font(21,500),fill=SUB,anchor="rt")
    text(d,(68,121),headline,49,INK,700)
    text(d,(70,196),subtitle,25,SUB,400)
    d.line((68,255,1012,255),fill="#dcd7ce",width=2)
    shot=Image.open(SRC / source).convert("RGB")
    crop = json.loads((SRC / "capture-crop.json").read_text())
    shot=shot.crop((crop["left"],crop["top"],shot.width-crop["right"],shot.height-crop["bottom"]))
    maxw,maxh = 944,1580
    scale=min(maxw/shot.width,maxh/shot.height)
    shot=shot.resize((round(shot.width*scale),round(shot.height*scale)),Image.Resampling.LANCZOS)
    x,y=(1080-shot.width)//2,288
    d.rectangle((x-2,y-2,x+shot.width+1,y+shot.height+1),fill="#dcd7ce")
    im.paste(shot,(x,y))
    im.save(OUT / f"{slug}-1080x1920.png",optimize=True)


def render_preview():
    im=Image.new("RGB",(1600,1080),"#e9e4dc")
    paste_fit(im,Image.open(OUT/"app-icon-512.png"),(42,42,170,170))
    paste_fit(im,Image.open(OUT/"feature-graphic-1024x500.png"),(255,34,1300,230))
    for i,(slug,_,_,_) in enumerate(PANELS):
        paste_fit(im,Image.open(OUT/f"{slug}-1080x1920.png"),(30+i*395,305,355,740))
    im.save(OUT/"preview.jpg",quality=94)


if __name__ == "__main__":
    render_icon()
    render_feature()
    if all((SRC/p[3]).exists() for p in PANELS):
        for i,panel in enumerate(PANELS,1):
            render_panel(i,*panel)
        render_preview()
    print(OUT)
