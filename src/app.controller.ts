import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';
import { randomInt } from 'crypto';

interface AuthorQuotes {
  author: string;
  quotes: any;
}

function tartalmaz(lista: AuthorQuotes[], nev: string) {
  for (let element of lista) {
    if (element.author == nev) {
      return element
    }
  };
  return null;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get("/quotes")
  @Render('listidezet')
  getqoutes() {
    return {
      message: "BAZ+",
      idezet: quotes.quotes
    };
  }

  @Get("/randomQuote")
  @Render('idezetegyedul')
  getrandomqoutes() {
    let szam = randomInt(quotes.quotes.length)
    return {
      message: "BAZ+",
      idezet: quotes.quotes[szam]
    };
  }

  @Get("/topAuthors")
  @Render('top')
  top() {

    let aq: AuthorQuotes[] = []
    quotes.quotes.forEach(e => {
      let x = tartalmaz(aq, e.author)
      if (x != null) {
        x.quotes.push(e.quote)
      } else {
        aq.push({ author: e.author, quotes: [e.quote] })
      }
    });

    aq.sort((a, b) => {
      return b.quotes.length - a.quotes.length
    })

    return {
      message: "BAZ+",
      author: aq
    };
  }


  @Get('quotes/:id')
  @Render('idezetegyedul')
  oneQuote(@Param('id') id: string) {
    for (let element of quotes.quotes) {
      if (element.id == parseInt(id)) {
        return {
          message: "BAZ+",
          idezet: quotes.quotes[quotes.quotes.indexOf(element)]
        };
      }
    }
    return {
      message: "BAZ+",
      idezet: {
        quote: "Nincs ilyen elem!",
        author: "",
        img: "https://cdn.pixabay.com/photo/2020/12/30/01/45/smile-5872116_1280.png"
      }
    };

  }

  @Get('deleteQuote/:id')
  @Render('deleteresponse')
  deleteqoute(@Param('id') id: string) {
    for (let element of quotes.quotes) {
      if (element.id == parseInt(id)) {

        quotes.quotes.splice(quotes.quotes.indexOf(element), 1)
        return {
          message: "BAZ+",
          valasz: "Sikeres törlés"
        };
      }
    }

    return {
      message: "BAZ+",
      valasz: "Nincs ilyen elem!!!"
    };
  }

  @Get('kereses')
  @Render('search')
  findtext(@Query('search') text: string = "") {
    let lista = []

    quotes.quotes.forEach(e => {
      if (e.quote.includes(text) || e.author.includes(text)) {
        lista.push(e)
      }
    });
    return {
      message: "BAZ+",
      idezet: lista
    };

  }

  @Get('authorRandomForm')
  @Render('authorRandomForm')
  authorRandomForm() {
    return {
      message: "BAZ+",
    };
  }
  @Get('authorRandom')
  @Render('authorRandom')
  authorRandom(@Query("author") author: string) {
    let x = []
    quotes.quotes.forEach(element => {
      if (element.author == author) {
        x.push(element)
      }
    });
    if (x.length == 0) {
      return {
        message: "BAZ+",
        idezet: {
          quote: "Nincs ilyen elem!",
          author: "",
          img: "https://cdn.pixabay.com/photo/2020/12/30/01/45/smile-5872116_1280.png"
        }
      };
    } else {
      let idezet = x[randomInt(x.length)]
      return {
        message: "BAZ+",
        idezet: idezet
      };
    }
  }

  @Get('highlight/:id')
  @Render('highlight')
  highlight(@Query("text") text: string,@Param('id') id:string) {
    
    
      if(quotes.quotes[parseInt(id)-1].quote.includes(text)){
        quotes.quotes[parseInt(id)-1].quote.replace(text,"<strong>"+text+"</strong>")
      }
    

    return{
      message: "BAZ+",
      idezet:quotes.quotes[parseInt(id)-1]
    }

  }

}


