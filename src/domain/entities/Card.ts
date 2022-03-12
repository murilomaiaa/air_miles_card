import { BaseEntity, BaseEntityDTO, BaseEntityProps } from './BaseEntity';
import { CreditCardCompany, CreditCardCompanyPartial, CreditCardCompanyProps } from './CreditCardCompany';

export type CardDTO = BaseEntityDTO & {
  number: string;
  holderName: string;
  holderEmail: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  creditCardCompany: CreditCardCompanyPartial;
};

export type CardProps = BaseEntityProps & {
  number: string;
  holderName: string;
  holderEmail: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  creditCardCompany: CreditCardCompanyProps | CreditCardCompany;
};

export class Card extends BaseEntity {
  private number: string;
  private holderName: string;
  private holderEmail: string;
  private expirationMonth: string;
  private expirationYear: string;
  private cvv: string;
  private creditCardCompany: CreditCardCompany;

  constructor(props: CardProps) {
    super(props);
    this.number = props.number;
    this.holderName = props.holderName;
    this.holderEmail = props.holderEmail;
    this.expirationMonth = props.expirationMonth;
    this.expirationYear = props.expirationYear;
    this.cvv = props.cvv;
    this.creditCardCompany =
      props.creditCardCompany instanceof CreditCardCompany
        ? props.creditCardCompany
        : new CreditCardCompany(props.creditCardCompany);
  }

  toDto(): CardDTO {
    return {
      id: this.id,
      number: this.number,
      holderName: this.holderName,
      holderEmail: this.holderEmail,
      expirationMonth: this.expirationMonth,
      expirationYear: this.expirationYear,
      cvv: this.cvv,
      creditCardCompany: this.creditCardCompany.toPartial(),
    };
  }
}
