import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';
import { randomInt } from 'crypto';
import { map } from 'rxjs';

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
        quote:"Nincs ilyen elem!!!!!!",
        author:""
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
      valasz: "Nincs ilyen elem!!!!!!"
    };

  }

}
